class RemoveCustomerIdToAddresses < ActiveRecord::Migration
  def change
    remove_column :addresses, :customer_id, :integer
  end
end
