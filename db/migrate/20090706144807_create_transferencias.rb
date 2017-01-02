class CreateTransferencias < ActiveRecord::Migration
  def self.up
    create_table :transferencias do |t|
      t.integer :almacen_origen_id
      t.integer :almacen_destino_id
      t.datetime :fecha
      t.float :total, :pecision => 12, :scale => 2

      t.timestamps
    end
  end

  def self.down
    drop_table :transferencias
  end
end
