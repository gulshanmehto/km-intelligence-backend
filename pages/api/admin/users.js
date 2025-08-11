import prisma from '../../../../lib/prisma';
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const users = await prisma.user.findMany({
      include: { accounts: true },
    });

    const data = users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      metaAccounts: user.accounts.filter((acc) => acc.platform === 'META').length,
      googleAccounts: user.accounts.filter((acc) => acc.platform === 'GOOGLE').length,
      shopifyStores: user.accounts.filter((acc) => acc.platform === 'SHOPIFY').length,
    }));

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching users' });
  
}
