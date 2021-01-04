class AddHiddenToPage < ActiveRecord::Migration[6.0]
  def change
    add_column :pages, :hidden, :boolean
  end
end
