class CreateTransferenciaDetalles < ActiveRecord::Migration
  def self.up
    create_table :transferencia_detalles do |t|
      t.integer :item_id
      t.integer :transferencia_id
      t.float :cantidad, :precision => 10, :scale => 2 

      t.timestamps
    end
  end

  def self.down
    drop_table :transferencia_detalles
  end
end
