class DropCatsTable < ActiveRecord::Migration
  def up
    drop_table :cats
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
