exports.handler = async (event, context) => {
  const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN;
  const SITE_ID = process.env.SITE_ID; 

  if (!NETLIFY_TOKEN || !SITE_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing environment variables: NETLIFY_AUTH_TOKEN or SITE_ID. Please set these in the Netlify dashboard." }),
    };
  }

  try {
    // Fetch submissions from Netlify's API
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${SITE_ID}/submissions`,
      {
        headers: {
          Authorization: `Bearer ${NETLIFY_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Netlify API responded with ${response.status}`);
    }

    const data = await response.json();

    // Map the raw Netlify data to the Testimonial interface format
    const testimonials = data
      .filter(sub => sub.form_name === 'visitor-feedback')
      .map(sub => ({
        id: sub.id,
        name: sub.data.name || 'ANONYMOUS_ENTITY',
        message: sub.data.opinion || '',
        rating: parseInt(sub.data.rating) || 5,
        color: ['bg-brutal-lime', 'bg-brutal-pink-neon', 'bg-brutal-blue-electric', 'bg-brutal-orange-hot', 'bg-brutal-yellow', 'bg-brutal-cyan-deep'][Math.floor(Math.random() * 6)],
        // If the user provided a role, use it. Otherwise, use 'ROUND ONE'.
        role: sub.data.role?.trim() ? sub.data.role : 'ROUND ONE'
      }));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testimonials),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};