class SupplierpaymentDetail < ActiveRecord::Base
    belongs_to :supplier_payment
    belongs_to :document 
    belongs_to :supplier 
    belongs_to :purchase 
    belongs_to :concept 

    validates_presence_of :concept_id

    
    
    
    
    def sumar_total(id) 
        
        facturas = SupplierpaymentDetail.where(["supplier_payment_id = ? ", id ])
        if facturas
        ret=0  
        for factura in facturas
          
           ret += factura.total.round(2)
         
        end
        end 
    
        return ret
    end 
    
    def get_document(id)
        a = Document.find(id)
        return a.description 
    end 

    def get_supplier_ruc(id)

        a =Supplier.find(id)
        return a.ruc 

    end 
    
    def get_supplier(id)

    a =Supplier.find(id)
    return a.name 
    end 

end
