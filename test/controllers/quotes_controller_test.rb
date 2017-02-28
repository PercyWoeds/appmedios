require 'test_helper'

class QuotesControllerTest < ActionController::TestCase
  setup do
    @quote = quotes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:quotes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create quote" do
    assert_difference('Quote.count') do
      post :create, quote: { comision1: @quote.comision1, comision2: @quote.comision2, factura1: @quote.factura1, factura2: @quote.factura2, facturacanal: @quote.facturacanal, fecha: @quote.fecha, importe: @quote.importe, nro: @quote.nro, total: @quote.total, vventa: @quote.vventa }
    end

    assert_redirected_to quote_path(assigns(:quote))
  end

  test "should show quote" do
    get :show, id: @quote
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @quote
    assert_response :success
  end

  test "should update quote" do
    patch :update, id: @quote, quote: { comision1: @quote.comision1, comision2: @quote.comision2, factura1: @quote.factura1, factura2: @quote.factura2, facturacanal: @quote.facturacanal, fecha: @quote.fecha, importe: @quote.importe, nro: @quote.nro, total: @quote.total, vventa: @quote.vventa }
    assert_redirected_to quote_path(assigns(:quote))
  end

  test "should destroy quote" do
    assert_difference('Quote.count', -1) do
      delete :destroy, id: @quote
    end

    assert_redirected_to quotes_path
  end
end
