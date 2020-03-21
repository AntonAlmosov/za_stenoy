class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.string :title
      t.string :page_type
      t.text :established
      t.text :description

      t.timestamps
    end
  end
end
