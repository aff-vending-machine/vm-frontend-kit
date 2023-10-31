type UniqueID = number;
type DateTime = Date;
type AnyDateTime = Date | null | undefined;
type AnyString = string | null | undefined;

type APIProtocol<T> = {
  code: number;
  status: 'done' | 'error';
  data?: T;
  message?: string;
};
