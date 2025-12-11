import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitDb1765453241408 implements MigrationInterface {
  private readonly userTable = new Table({
    name: 'user',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'balance',
        type: 'int',
        default: 0,
      },
    ],
  });

  private readonly balanceActionTable = new Table({
    name: 'balance_action',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'user_id',
        type: 'int',
      },
      {
        name: 'action',
        type: 'varchar',
      },
      {
        name: 'amount',
        type: 'decimal',
        precision: 10,
        scale: 2,
      },
      {
        name: 'ts',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  private readonly userBalanceActionFK = new TableForeignKey({
    name: 'user_balance_action_fk',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: this.userTable.name,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userTable);

    await queryRunner.createTable(this.balanceActionTable);

    await queryRunner.createForeignKey(
      this.balanceActionTable.name,
      this.userBalanceActionFK,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.balanceActionTable.name);
    await queryRunner.dropTable(this.userTable.name);
  }
}
