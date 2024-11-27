// graphql/auth.ts
export const MUTATIONS = {
  LOGIN: `
    mutation Login($data: LoginInput!) {
      login(data: $data) {
        user {
          id
          username
          email
        }
        token
        message
        shredProfile {
          user {
            username
            email
          }
          member_tier
          preferred_sport
          skill_level
          profile_picture
        }
      }
    }
  `,
  
  OAUTH_CALLBACK: `
    mutation Login($input: exchangeTokenInput!) {
      exchangeToken(input: $input) {
        user {
          id
          username
          email
        }
        token
        message
        shredProfile {
          user {
            username
            email
          }
          member_tier
          preferred_sport
          skill_level
          profile_picture
        }
      }
    }
  `,

  OAUTH_LOGIN: `
    mutation OauthLogin($provider: String!) {
      oauthRedirect(provider: $provider) {
        url
      }
    }
  `,

  AUTHENTICATED_USER: `
    mutation AuthenticatedUser($data: AuthCheck!) {
      authenticatedUser(data: $data) {
        user {
          id
          username
          email
        }
        token
        shredProfile {
          user {
            username
            email
          }
          member_tier
          preferred_sport
          skill_level
          profile_picture
        }
      }
    }
  `,

  CREATE_USER: `
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        user {
          id
          username
          email
        }
        token
        message
        shredProfile {
          user {
            username
            email
          }
          member_tier
          preferred_sport
          skill_level
          profile_picture
        }
      }
    }
  `,

  LOGOUT: `
    mutation Logout($data: AuthCheck!) {
      logout(data: $data) {
        user {
          id
          username
        }
        token
      }
    }
  `,
  UPDATE_PROFILE: `
    mutation UpdateProfile($input: UpdateProfileInput!) {
      updateProfile(input: $input) {
        user {
          id
          username
          email
        }
        token
        shredProfile {
          member_tier
          preferred_sport
          skill_level
          years_experience
          favorite_resort
          current_resort_location
          visited_resorts
          preferred_terrain
          preferred_resort_type
          equipment_brand
          owns_equipment
          season_pass_type
          emergency_contact_name
          emergency_contact_phone
          bio
          profile_picture
          preferred_lessons
          interested_in_competitions
          achievements
        }
        message
      }
    }
  `,
};
