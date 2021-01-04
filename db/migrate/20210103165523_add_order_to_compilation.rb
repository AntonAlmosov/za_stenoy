class AddOrderToCompilation < ActiveRecord::Migration[6.0]
  def change
    add_column :compilations, :order, :integer
  end
end
