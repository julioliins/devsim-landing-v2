import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Download, Loader2, Trash2, FileText } from "lucide-react";
import { usePrivacy } from "@/hooks/usePrivacy";
import { toast } from "sonner";

export default function PrivacySettings() {
  const { consents, exportRequests, updateConsent, requestDataExport, deleteAccount, isUpdatingConsent, isRequestingExport, isDeletingAccount } = usePrivacy();
  const [activeTab, setActiveTab] = useState<"consents" | "export" | "delete">("consents");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleConsentChange = async (consentType: "privacy_policy" | "terms_of_use" | "marketing" | "data_processing", given: boolean) => {
    try {
      await updateConsent({ consentType, given });
      toast.success("Consentimento atualizado");
    } catch (error) {
      toast.error("Erro ao atualizar consentimento");
    }
  };

  const handleExportData = async () => {
    try {
      await requestDataExport();
      setExportSuccess(true);
      toast.success("Solicitação de exportação enviada!");
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      toast.error("Erro ao solicitar exportação");
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "EXCLUIR") {
      toast.error("Digite 'EXCLUIR' para confirmar");
      return;
    }

    try {
      await deleteAccount(deleteConfirmation);
      toast.success("Conta será excluída em até 30 dias");
      setDeleteConfirmation("");
    } catch (error) {
      toast.error("Erro ao excluir conta");
    }
  };

  const getConsentValue = (consentType: string) => {
    const consent = consents?.find((c) => c.consentType === consentType);
    return consent?.given ?? false;
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab("consents")}
          className={`px-4 py-2 font-medium text-sm transition whitespace-nowrap ${
            activeTab === "consents"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Consentimentos
        </button>
        <button
          onClick={() => setActiveTab("export")}
          className={`px-4 py-2 font-medium text-sm transition whitespace-nowrap ${
            activeTab === "export"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Exportar Dados
        </button>
        <button
          onClick={() => setActiveTab("delete")}
          className={`px-4 py-2 font-medium text-sm transition whitespace-nowrap ${
            activeTab === "delete"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Excluir Conta
        </button>
      </div>

      {/* Consents Tab */}
      {activeTab === "consents" && (
        <div className="space-y-4">
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Gerenciar Consentimentos</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <Checkbox
                  id="privacy"
                  checked={getConsentValue("privacy_policy")}
                  onCheckedChange={(checked) =>
                    handleConsentChange("privacy_policy", checked as boolean)
                  }
                  disabled={isUpdatingConsent}
                />
                <div className="flex-1">
                  <Label htmlFor="privacy" className="font-medium cursor-pointer">
                    Política de Privacidade
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Concordo com a coleta e processamento de meus dados conforme descrito na política.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <Checkbox
                  id="terms"
                  checked={getConsentValue("terms_of_use")}
                  onCheckedChange={(checked) =>
                    handleConsentChange("terms_of_use", checked as boolean)
                  }
                  disabled={isUpdatingConsent}
                />
                <div className="flex-1">
                  <Label htmlFor="terms" className="font-medium cursor-pointer">
                    Termos de Uso
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Concordo com os termos e condições de uso da plataforma.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <Checkbox
                  id="marketing"
                  checked={getConsentValue("marketing")}
                  onCheckedChange={(checked) =>
                    handleConsentChange("marketing", checked as boolean)
                  }
                  disabled={isUpdatingConsent}
                />
                <div className="flex-1">
                  <Label htmlFor="marketing" className="font-medium cursor-pointer">
                    Comunicações de Marketing
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Desejo receber e-mails com novidades, promoções e atualizações.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <Checkbox
                  id="processing"
                  checked={getConsentValue("data_processing")}
                  onCheckedChange={(checked) =>
                    handleConsentChange("data_processing", checked as boolean)
                  }
                  disabled={isUpdatingConsent}
                />
                <div className="flex-1">
                  <Label htmlFor="processing" className="font-medium cursor-pointer">
                    Processamento de Dados
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Autorizo o processamento de meus dados para melhorar a experiência na plataforma.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* LGPD Info */}
          <Card className="p-6 border border-border bg-blue-50 dark:bg-blue-950">
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Conformidade com LGPD
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  Seus dados são protegidos de acordo com a Lei Geral de Proteção de Dados (LGPD).
                  Você tem direito a:
                </p>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-4">
                  <li>✓ Acessar seus dados pessoais</li>
                  <li>✓ Corrigir dados incorretos</li>
                  <li>✓ Solicitar exclusão de dados</li>
                  <li>✓ Exportar seus dados em formato portável</li>
                  <li>✓ Revogar consentimentos a qualquer momento</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === "export" && (
        <div className="space-y-4">
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">Exportar Seus Dados</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Baixe uma cópia de todos os seus dados em formato JSON. Você receberá um e-mail com o link de download em até 24 horas.
            </p>

            {exportSuccess && (
              <div className="flex gap-2 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <p className="text-sm text-green-800 dark:text-green-200">
                  Solicitação enviada! Verifique seu e-mail.
                </p>
              </div>
            )}

            <Button
              onClick={handleExportData}
              disabled={isRequestingExport}
              className="w-full mb-4"
            >
              {isRequestingExport ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Solicitar Exportação de Dados
                </>
              )}
            </Button>

            {exportRequests && exportRequests.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-foreground mb-2">Solicitações Anteriores</h4>
                {exportRequests.map((request) => (
                  <div key={request.id} className="p-3 border border-border rounded-lg text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        {new Date(request.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === "ready"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                            : request.status === "processing"
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                              : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {request.status === "ready"
                          ? "Pronto"
                          : request.status === "processing"
                            ? "Processando"
                            : "Pendente"}
                      </span>
                    </div>
                    {request.downloadUrl && (
                      <a
                        href={request.downloadUrl}
                        className="text-primary hover:underline text-sm mt-2 inline-block"
                      >
                        Baixar dados
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Delete Tab */}
      {activeTab === "delete" && (
        <div className="space-y-4">
          <Card className="p-6 border border-border bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <div className="flex gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 dark:text-red-100">Atenção!</h4>
                <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                  A exclusão de sua conta é irreversível. Todos os seus dados serão permanentemente removidos após 30 dias.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Excluir Minha Conta</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Para confirmar a exclusão de sua conta, digite <strong>EXCLUIR</strong> no campo abaixo:
              </p>
              <div>
                <Label htmlFor="confirm-delete">Confirmação</Label>
                <Input
                  id="confirm-delete"
                  type="text"
                  placeholder="Digite EXCLUIR"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value.toUpperCase())}
                  disabled={isDeletingAccount}
                />
              </div>
              <Button
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount || deleteConfirmation !== "EXCLUIR"}
                variant="destructive"
                className="w-full"
              >
                {isDeletingAccount ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Minha Conta
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
