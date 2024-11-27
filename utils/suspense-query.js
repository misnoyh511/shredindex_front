const statuses = {
  pending: 'pending',
  error: 'error',
  success: 'success',
};

const fetchPolicy = 'network-only';

/**
 * A helpful factory suggested by https://isamatov.com/react-suspense-graphql-hooks/
 */
const suspenseQuery = (client, queries) => {
  let status = statuses.pending;
  let result;

  // Setup queries
  const mapped = queries.map((query) => {
    if (Object.prototype.hasOwnProperty.call(query, 'kind')) {
      // Assume the query is gql DocumentNode
      return client.query({ query, fetchPolicy });
    }

    if (!Object.prototype.hasOwnProperty.call(query, 'query')
      || !Object.prototype.hasOwnProperty.call(query.query, 'kind')
    ) {
      throw new Error('Suspense query items must be either a gql DocumentNode '
        + 'or have the "query" property with a gql DocumentNode');
    }

    // Assume query is passing arguments for a client's query options
    return client.query({ ...query, fetchPolicy });
  });

  // Batch queries in a promise.all
  const suspender = Promise.all(mapped)
    .then((data) => {
      status = statuses.success;
      result = data;
    })
    .catch((err) => {
      status = statuses.error;
      result = err;
    });

  return {
    read() {
      if (status === statuses.pending) {
        throw suspender;
      } else if (status === statuses.error) {
        throw result;
      } else {
        return result;
      }
    },
  };
};

export default suspenseQuery;
