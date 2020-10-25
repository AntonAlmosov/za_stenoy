class AddMiddlenameToAuthor < ActiveRecord::Migration[6.0]
  def change
    add_column :authors, :middlename, :string
  end
end
