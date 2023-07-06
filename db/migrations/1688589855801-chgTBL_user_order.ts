import { MigrationInterface, QueryRunner } from "typeorm";

export class ChgTBLUserOrder1688589855801 implements MigrationInterface {
    name = 'ChgTBLUserOrder1688589855801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_6f1544d869f165e209a7b15d502\``);
        await queryRunner.query(`DROP INDEX \`IDX_6f1544d869f165e209a7b15d50\` ON \`orders\``);
        await queryRunner.query(`DROP INDEX \`REL_6f1544d869f165e209a7b15d50\` ON \`orders\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`shippingAdressId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`shippingAddressId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD UNIQUE INDEX \`IDX_cc4e4adab232e8c05026b2f345\` (\`shippingAddressId\`)`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_f98c5a74d02c74694392026011f\``);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`addedById\` \`addedById\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_d7e7f53b786522ae18147bb853c\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`addedById\` \`addedById\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`categoryId\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders_products\` DROP FOREIGN KEY \`FK_823bad3524a5d095453c43286bb\``);
        await queryRunner.query(`ALTER TABLE \`orders_products\` DROP FOREIGN KEY \`FK_4eff63e89274f79195e25c5c115\``);
        await queryRunner.query(`ALTER TABLE \`orders_products\` CHANGE \`orderId\` \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders_products\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_1102b5a0c580f845993e2f766f6\``);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`shippedAt\` \`shippedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`deliveredAt\` \`deliveredAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`updatedById\` \`updatedById\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_7ed5659e7139fc8bc039198cc1f\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_a6b3c434392f5d10ec171043666\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_cc4e4adab232e8c05026b2f345\` ON \`orders\` (\`shippingAddressId\`)`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_f98c5a74d02c74694392026011f\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_d7e7f53b786522ae18147bb853c\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_products\` ADD CONSTRAINT \`FK_823bad3524a5d095453c43286bb\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_products\` ADD CONSTRAINT \`FK_4eff63e89274f79195e25c5c115\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_1102b5a0c580f845993e2f766f6\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_cc4e4adab232e8c05026b2f345d\` FOREIGN KEY (\`shippingAddressId\`) REFERENCES \`shippings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_7ed5659e7139fc8bc039198cc1f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_a6b3c434392f5d10ec171043666\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_a6b3c434392f5d10ec171043666\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_7ed5659e7139fc8bc039198cc1f\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_cc4e4adab232e8c05026b2f345d\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_1102b5a0c580f845993e2f766f6\``);
        await queryRunner.query(`ALTER TABLE \`orders_products\` DROP FOREIGN KEY \`FK_4eff63e89274f79195e25c5c115\``);
        await queryRunner.query(`ALTER TABLE \`orders_products\` DROP FOREIGN KEY \`FK_823bad3524a5d095453c43286bb\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_d7e7f53b786522ae18147bb853c\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_f98c5a74d02c74694392026011f\``);
        await queryRunner.query(`DROP INDEX \`REL_cc4e4adab232e8c05026b2f345\` ON \`orders\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`productId\` \`productId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_a6b3c434392f5d10ec171043666\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_7ed5659e7139fc8bc039198cc1f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`updatedById\` \`updatedById\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`deliveredAt\` \`deliveredAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`shippedAt\` \`shippedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_1102b5a0c580f845993e2f766f6\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_products\` CHANGE \`productId\` \`productId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders_products\` CHANGE \`orderId\` \`orderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders_products\` ADD CONSTRAINT \`FK_4eff63e89274f79195e25c5c115\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_products\` ADD CONSTRAINT \`FK_823bad3524a5d095453c43286bb\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`addedById\` \`addedById\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_d7e7f53b786522ae18147bb853c\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`addedById\` \`addedById\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_f98c5a74d02c74694392026011f\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP INDEX \`IDX_cc4e4adab232e8c05026b2f345\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`shippingAddressId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`shippingAdressId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6f1544d869f165e209a7b15d50\` ON \`orders\` (\`shippingAdressId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6f1544d869f165e209a7b15d50\` ON \`orders\` (\`shippingAdressId\`)`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_6f1544d869f165e209a7b15d502\` FOREIGN KEY (\`shippingAdressId\`) REFERENCES \`shippings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
