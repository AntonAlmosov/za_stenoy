class AddPublicToAuthor < ActiveRecord::Migration[6.0]
  def change
    add_column :authors, :public, :boolean
  end
end
