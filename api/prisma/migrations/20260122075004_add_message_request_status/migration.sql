-- AlterTable
ALTER TABLE "app_users" ADD COLUMN     "messageStatus" TEXT NOT NULL DEFAULT 'everyone',
ALTER COLUMN "profile" SET DEFAULT 'https://res.cloudinary.com/dcqhyzxa7/image/upload/v1768973215/jinqrc9tfa0rdl1tvkkz.svg';
