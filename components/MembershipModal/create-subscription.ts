import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentMethodId, email, name } = req.body;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.cookies.token}`, // Assuming you store the token in cookies
      },
      body: JSON.stringify({
        query: `
          mutation CreateSubscription($input: CreateSubscriptionInput!) {
            createSubscription(input: $input) {
              user {
                id
                username
                email
              }
              token
              shredProfile {
                member_tier
              }
              message
            }
          }
        `,
        variables: {
          input: {
            paymentMethodId,
            email,
            name,
          },
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return res.status(200).json(data.data.createSubscription);
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(400).json({ error: error.message });
  }
}
