class AddNoteToNews < ActiveRecord::Migration[6.0]
  def change
    add_column :news, :note, :string
  end
end
