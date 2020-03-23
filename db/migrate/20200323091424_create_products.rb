class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :price
      t.string :purchase_link
      t.string :release_date
      t.integer :page_id

      t.timestamps
    end
  end
end
