const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { amount } = JSON.parse(event.body);
  const uid = event.headers['x-user-id'] || 'unknown';

  try {
    // Assumes you already connected stylist's Stripe account during onboarding
    const stylist = await stripe.accounts.retrieve(uid); // or however you store connected account ID

    await stripe.transfers.create({
      amount,
      currency: 'cad',
      destination: stylist.id, // their connected Stripe account
      transfer_group: 'stylist_payout'
    });

    // Deduct from Firebase wallet (including fee handled in frontend)
    return { statusCode: 200 };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
