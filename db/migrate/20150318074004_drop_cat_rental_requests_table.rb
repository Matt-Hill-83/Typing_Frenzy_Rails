class DropCatRentalRequestsTable < ActiveRecord::Migration
  def up
    drop_table :cat_rental_requests
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end

end
