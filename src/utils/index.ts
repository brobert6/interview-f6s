import { Ref } from "vue";

export function mapPromiseStatusWithCallbacks(
  fetchPromise: Promise<any>,
  isLoading?: Ref<boolean>,
  onSuccess?: (response: any) => void,
  onError?: (err: unknown) => void
): void {
  if (isLoading) isLoading.value = true;
  fetchPromise
    .then((response: any) => {
      if (onSuccess) onSuccess(response);
    })
    .catch((err) => {
      if (onError) onError(err);
    })
    .finally(() => {
      if (isLoading) isLoading.value = false;
    });
}

export async function waitForXSecond(x: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Waited for 1 second.");
    }, x * 1000);
  });
}
