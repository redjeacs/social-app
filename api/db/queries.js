require("dotenv").config();
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const db_URL = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

const adapter = new PrismaPg({
  connectionString: db_URL,
});
const prisma = new PrismaClient({ adapter });

exports.createUser = async (email, firstName, lastName, username, password) => {
  await prisma.user.create({
    data: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    },
  });
};

exports.getUser = async (colName, query) => {
  const key = { [colName]: query };
  const user = await prisma.user.findUnique({
    where: key,
  });
  return user;
};
