class Declaration < ActiveRecord::Base
	self.per_page = 20
	validates_presence_of :company_id, :customer_id, :code, :user_id
  
  belongs_to :company
  belongs_to :location
  belongs_to :division
  belongs_to :customer
  belongs_to :user
  belongs_to :truck 
  belongs_to :employee


  has_many :declarationdeliveries

def not_deliveries_with?(delivery_id)
    declarationdeliveries.where(delivery_id: delivery_id).count < 1
end


def self.code_matches(param)
    matches('code', param)
end

def self.matches(field_name, param)
    where("lower(#{field_name}) like ?", "%#{param}%")
end


  def correlativo
        voided= Voided.new()
        voided.numero=Voided.find(3).numero.to_i + 1
        lcnumero=voided.numero.to_s
        Voided.where(:id=>'3').update_all(:numero =>lcnumero)        
  end

  def get_subtotal(items)
    subtotal = 0
    
    for item in items
      if(item and item != "")
        parts = item.split("|BRK|")
        
        id = parts[0]
        quantity = parts[1]
        unidad_id  = parts[2]
        peso = parts[3]
        price = parts[4]
        discount = parts[5]
        
        total = price.to_f * quantity.to_i
        total -= total * (discount.to_f / 100)
        
        begin
          product = Service.find(id.to_i)
          subtotal += total
        rescue
        end
      end
    end
    
    return subtotal
  end
  
  def get_tax(items, customer_id)
    tax = 0
    
    customer = Customer.find(customer_id)
    
    if(customer)
      if(customer.taxable == "1")
        for item in items
          if(item and item != "")
            parts = item.split("|BRK|")
        
            id = parts[0]
            quantity = parts[1]
            unidad_id  = parts[2]
            peso     = parts[3]
            price    = parts[4]
            discount = parts[5]
            
            total = price.to_f * quantity.to_i
            total -= total * (discount.to_f / 100)
        
            begin
              product = Service.find(id.to_i)
              
              if(product)
                if(product.tax1 and product.tax1 > 0)
                  tax += total * (product.tax1 / 100)
                end
                
              end
            rescue
            end
          end
        end
      end
    end
    
    return tax
  end
  
  def delete_services()
    delivery_services = DeliveryService.where(delivery_id: self.id)
    
    for ip in delivery_services
      ip.destroy
    end
  end
  
  def add_services(items)
    for item in items
      if(item and item != "")
        parts = item.split("|BRK|")
        
        id = parts[0]
        quantity = parts[1]
        unidad_id  = parts[2]
        peso     = parts[3]
        price    = parts[4]
        discount = parts[5]
        
        total = price.to_f * quantity.to_i
        total -= total * (discount.to_f / 100)
        
        begin
          service = Service.find(id.to_i)
          new_delivery_service = DeliveryService.new(:delivery_id => self.id, :service_id => service.id, :price => price.to_f, :quantity => quantity.to_i,:unidad_id=> unidad_id.to_i,:peso=>peso.to_i, :discount => discount.to_f, :total => total.to_f)
          new_delivery_service.save

        rescue
          
        end
      end
    end
  end
  
  def identifier
    return "#{self.code} - #{self.customer.name}"
  end

  

  def get_services   
    @itemservices = DeliveryService.find_by_sql(['Select delivery_services.price,delivery_services.quantity,delivery_services.discount,
delivery_services.total,delivery_services.unidad_id,delivery_services.peso,services.name  
from delivery_services INNER JOIN services ON delivery_services.service_id = services.id 
where delivery_services.delivery_id = ?', self.id ])


    return @itemservices

  end
  
  def get_delivery_services
   	delivery_services = DeliveryService.where(delivery_id:  self.id)    
    return delivery_services
  end

  
  def services_lines
    services = []
    delivery_services = DeliveryService.where(delivery_id:  self.id)
    
    delivery_services.each do | ip |

      ip.service[:price]    = ip.price
      ip.service[:quantity] = ip.quantity
      ip.service[:unidad_id] = ip.unidad_id 
      ip.service[:peso]     = ip.peso
      ip.service[:discount] = ip.discount
      ip.service[:total]    = ip.total
      #products.push("#{ip.product.id}|BRK|#{ip.product.curr_quantity}|BRK|#{ip.product.curr_price}|BRK|#{ip.product.curr_discount}")
        services.push("#{ip.service.id}|BRK|#{ip.service.quantity}|BRK|#{ip.service.unidad_id}|BRK|#{ip.service.peso}|BRK|#{ip.service.price}|BRK|#{ip.service.discount}")
    end


    return services.join(",")
  end
  
  def get_processed
    if(self.processed == "1")
      return "Processed"
    else
      return "Not yet processed"
    end
  end
  
  def get_processed_short
    if(self.processed == "1")
      return "Yes"
    else
      return "No"
    end
  end
  
  def get_return
    if(self.return == "1")
      return "Yes"
    else
      return "No"
    end
  end
  
  def get_truck2(truck2_id)
    @truck2= Truck.find(truck2_id).placa
    return  @truck2
  end
  
  
  
  def process

    if(self.processed == "1" or self.processed == true)
      delivery_services = DeliveryService.where(delivery_id: self.id)
    
      for ip in delivery_services
        service = ip.service
        
        if(service.quantity)
          if(self.return == "0")
            ip.service.quantity -= ip.quantity
          else
            ip.service.quantity += ip.quantity
          end
          ip.service.save
        end
      end
      
      self.date_processed = Time.now
      self.save
    end
  end
  
  # Color for processed or not
  def processed_color
    if(self.processed == "1")
      return "green"
    else
      return "red"
    end
  end
end


