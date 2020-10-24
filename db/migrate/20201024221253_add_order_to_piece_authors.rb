class AddOrderToPieceAuthors < ActiveRecord::Migration[6.0]
  def change
    add_column :piece_authors, :order, :integer
  end
end
