
class ContratoDetailsController < ApplicationController
   
  
   
 def import
      ContratoDetail.import(params[:file])
       redirect_to root_url, notice: "Contratos  detalle importados."
  end 
  
  

  # GET /contrato_details/new
  def new
    a = @contrato
  $lcCliente = a.customer.name 
  $lcMedio = a.medio.descrip 
  $lcComision1 = a.comision1
  $lcComision2 = a.comision2
  $lcTipoContrato = a.tipocontrato_id 
  $lcNrocuotas = a.nrocuotas
  $lcImporte  = a.importe 
  
  
    @contrato_detail = ContratoDetail.new
    @contrato_detail[:fecha]= Date.today 
    @contrato_detail[:importe]= 0.00
    @contrato_detail[:vventa]= 0.00
    @contrato_detail[:comision1]= 0.00
    @contrato_detail[:comision2]= 0.00
    @contrato_detail[:total]= 0.00
  end

  # GET /contrato_details/1/edit
  def edit
    a = @contrato
  $lcCliente = a.customer.name 
  $lcMedio = a.medio.descrip 
  $lcComision1 = a.comision1
  $lcComision2 = a.comision2
  $lcTipoContrato = a.tipocontrato_id 
  $lcNrocuotas = a.nrocuotas
  $lcImporte  = a.importe 
  end

  # POST /contrato_details
  # POST /contrato_details.json
  def create
    @contrato_detail = ContratoDetail.new(contrato_detail_params)
    @contrato_detail.contrato_id  = @contrato.id 
    
    respond_to do |format|
      if @contrato_detail.save
        format.html { redirect_to @contrato, notice: 'Contrato detail was successfully created.' }
        format.json { render :show, status: :created, location: @contrato }
      else
        format.html { render :new }
        format.json { render json: @contrato.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /contrato_details/1
  # PATCH/PUT /contrato_details/1.json
  def update
    @contrato_detail.contrato_id  = @contrato.id 
    respond_to do |format|
      if @contrato_detail.update(contrato_detail_params)
        format.html { redirect_to @contrato, notice: 'Contrato detail was successfully updated.' }
        format.json { render :show, status: :ok, location: @contrato }
      else
        format.html { render :edit }
        format.json { render json: @contrato.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /contrato_details/1
  # DELETE /contrato_details/1.json
  def destroy
    @contrato_detail.destroy
    
    if @contrato_detail.destroy
      flash[:notice]= "Item fue eliminado satisfactoriamente "
      redirect_to @contrato 
    else
      flash[:error]= "Item ha tenido un error y no fue eliminado"
      render :show 
    end 
    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # Never trust parameters from the scary internet, only allow the white list through.
    def contrato_detail_params
      params.require(:contrato_detail).permit(:nro, :fecha, :importe, :vventa, :comision1, :comision2, :comision3,:total, :facturacanal, :fecha2, :factura1, :factura2,:contrato_id,:sit,:fechafac1,:fechafac2)
    end
end
