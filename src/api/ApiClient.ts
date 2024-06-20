/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserForm {
  loginId: string;
  loginPassword: string;
  name: string;
  nickname: string;
  preferredLanguage?: string;
  /** @format date */
  birth?: string;
  email: string;
  phoneNumber?: string;
}

export interface LoginForm {
  loginId: string;
  loginPassword: string;
}

export interface EmailMessage {
  to?: string;
  subject?: string;
  message?: string;
}

export interface Attempt {
  user?: User;
  problem?: Problem;
}

export interface IoExample {
  /** @format int64 */
  id?: number;
  input?: string;
  output?: string;
  problem?: Problem;
}

export interface Problem {
  /** @format int64 */
  id?: number;
  title?: string;
  problemDescription?: string;
  inputDescription?: string;
  outputDescription?: string;
  stage?: Stage;
  ioExamples?: IoExample[];
  attempts?: Attempt[];
}

export interface Progress {
  /** @format int64 */
  id?: number;
  user?: User;
  stage?: Stage;
  attemptResult?: 'SUCCESS' | 'FAIL' | 'NOT_ATTEMPTED';
}

export interface Stage {
  /** @format int64 */
  id?: number;
  level?: string;
  programmingLanguage?: 'JAVA' | 'JAVASCRIPT';
  category?:
    | 'IO'
    | 'CONDITION'
    | 'LOOP'
    | 'ONE_DIMENSION_ARRAY'
    | 'STRING'
    | 'TWO_DIMENSION_ARRAY'
    | 'DEEPEN'
    | 'FUNCTION'
    | 'MATH'
    | 'RECURSION';
  problem?: Problem;
  progresses?: Progress[];
}

export interface User {
  /** @format int64 */
  id?: number;
  loginId?: string;
  loginPassword?: string;
  name?: string;
  nickname?: string;
  /** @format date */
  birth?: string;
  email?: string;
  phoneNumber?: string;
  /** @format int32 */
  coin?: number;
  preferredLanguage?: 'JAVA' | 'JAVASCRIPT';
  attempts?: Attempt[];
  progresses?: Progress[];
}

export interface ItemPurchaseRequest {
  /** @format int32 */
  quantity?: number;
}

export interface ItemPurchaseResponse {
  /** @format int32 */
  usedCoin?: number;
  message?: string;
}

export interface UserResponse {
  loginId?: string;
  loginPassword?: string;
  name?: string;
  nickname?: string;
  preferredLanguage?: string;
  /** @format date */
  birth?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ProgrammingLanguageResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format double */
  progress?: number;
}

export interface CategoryResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format double */
  progress?: number;
}

export interface StageResponse {
  /** @format int64 */
  id?: number;
  level?: string;
  programmingLanguage?: 'JAVA' | 'JAVASCRIPT';
  category?:
    | 'IO'
    | 'CONDITION'
    | 'LOOP'
    | 'ONE_DIMENSION_ARRAY'
    | 'STRING'
    | 'TWO_DIMENSION_ARRAY'
    | 'DEEPEN'
    | 'FUNCTION'
    | 'MATH'
    | 'RECURSION';
}

export interface IoExampleResponse {
  /** @format int64 */
  id?: number;
  input?: string;
  output?: string;
}

export interface ProblemResponse {
  /** @format int64 */
  id?: number;
  title?: string;
  problemDescription?: string;
  inputDescription?: string;
  outputDescription?: string;
  ioExamples?: IoExampleResponse[];
}

export interface ItemListResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format int32 */
  stockQuantity?: number;
  /** @format int32 */
  price?: number;
}

export interface ItemDetailResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format int32 */
  stockQuantity?: number;
  /** @format int32 */
  price?: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'http://118.67.128.223:8080',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Spring Boot REST API Specifications
 * @version 1.0.0
 * @baseUrl http://118.67.128.223:8080
 *
 * Specification
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * @description 새로운 사용자를 생성합니다.
     *
     * @tags user-controller
     * @name CreateUser
     * @summary 회원가입 API
     * @request POST:/users/new
     */
    createUser: (data: UserForm, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/new`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 사용자가 로그아웃합니다.
     *
     * @tags user-controller
     * @name Logout
     * @summary 로그아웃 API
     * @request POST:/users/logout
     */
    logout: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/users/logout`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description 사용자가 로그인합니다.
     *
     * @tags user-controller
     * @name LoginUser
     * @summary 로그인 API
     * @request POST:/users/login
     */
    loginUser: (data: LoginForm, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/users/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 특정 사용자의 정보를 조회합니다.
     *
     * @tags user-controller
     * @name FindUser
     * @summary 회원 정보 조회 API
     * @request GET:/users/{userId}
     */
    findUser: (userId: number, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/users/${userId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 특정 사용자의 정보를 수정합니다.
     *
     * @tags user-controller
     * @name UpdateUser
     * @summary 회원 정보 수정 API
     * @request PATCH:/users/{userId}
     */
    updateUser: (userId: number, data: UserForm, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${userId}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  sendMail = {
    /**
     * @description 메일 메시지를 특정 사용자 이메일 주소로 전송합니다.
     *
     * @tags email-controller
     * @name SendMail
     * @summary 이메일 전송 API
     * @request POST:/send-mail
     */
    sendMail: (params: RequestParams = {}) =>
      this.request<EmailMessage, any>({
        path: `/send-mail`,
        method: 'POST',
        ...params,
      }),
  };
  problems = {
    /**
     * @description 특정 문제의 상세 정보를 반환합니다.
     *
     * @tags problem-controller
     * @name ProblemDetails
     * @summary 문제 상세 조회 API
     * @request GET:/problems/{problemId}
     */
    problemDetails: (problemId: number, params: RequestParams = {}) =>
      this.request<ProblemResponse, any>({
        path: `/problems/${problemId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 특정 문제에 대한 풀이 결과를 제출합니다.
     *
     * @tags problem-controller
     * @name SolveProblem
     * @summary 문제 풀이 결과 API
     * @request POST:/problems/{problemId}
     */
    solveProblem: (
      problemId: number,
      data: {
        sourceCode?: string;
        user?: User;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/problems/${problemId}`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  items = {
    /**
     * @description 특정 아이템의 상세 정보를 반환합니다.
     *
     * @tags item-controller
     * @name FindOne
     * @summary 아이템 상세 조회 API
     * @request GET:/items/{itemId}
     */
    findOne: (itemId: number, params: RequestParams = {}) =>
      this.request<ItemDetailResponse, any>({
        path: `/items/${itemId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 특정 아이템을 구매합니다.
     *
     * @tags item-controller
     * @name Purchase
     * @summary 아이템 구매 API
     * @request POST:/items/{itemId}
     */
    purchase: (
      itemId: number,
      query: {
        /** @format int64 */
        userId: number;
      },
      data: ItemPurchaseRequest,
      params: RequestParams = {},
    ) =>
      this.request<ItemPurchaseResponse, any>({
        path: `/items/${itemId}`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 사용 가능한 모든 아이템의 리스트를 반환합니다.
     *
     * @tags item-controller
     * @name Items
     * @summary 아이템 전체 조회 API
     * @request GET:/items
     */
    items: (params: RequestParams = {}) =>
      this.request<ItemListResponse[], any>({
        path: `/items`,
        method: 'GET',
        ...params,
      }),
  };
  programmingLanguage = {
    /**
     * @description 사용 가능한 모든 프로그래밍 언어의 리스트를 반환합니다.
     *
     * @tags game-controller
     * @name ProgrammingLanguageList
     * @summary 프로그래밍언어 리스트 정보 API
     * @request GET:/programmingLanguage
     */
    programmingLanguageList: (
      query: {
        user: User;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProgrammingLanguageResponse[], any>({
        path: `/programmingLanguage`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description 특정 프로그래밍 언어의 모든 카테고리 리스트를 반환합니다.
     *
     * @tags game-controller
     * @name CategoryList
     * @summary 카테고리 리스트 정보 API
     * @request GET:/programmingLanguage/{programmingLanguageId}/categories
     */
    categoryList: (
      programmingLanguageId: number,
      query: {
        user: User;
      },
      params: RequestParams = {},
    ) =>
      this.request<CategoryResponse[], any>({
        path: `/programmingLanguage/${programmingLanguageId}/categories`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description 특정 프로그래밍 언어의 특정 카테고리에 대한 상세 정보를 반환합니다.
     *
     * @tags game-controller
     * @name CategoryDetails
     * @summary 카테고리 상세 정보 API
     * @request GET:/programmingLanguage/{programmingLanguageId}/categories/{categoryId}
     */
    categoryDetails: (
      programmingLanguageId: number,
      categoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<CategoryResponse, any>({
        path: `/programmingLanguage/${programmingLanguageId}/categories/${categoryId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 특정 프로그래밍 언어의 특정 카테고리에 속한 모든 스테이지 리스트를 반환합니다.
     *
     * @tags game-controller
     * @name StageList
     * @summary 스테이지 리스트 정보 API
     * @request GET:/programmingLanguage/{programmingLanguageId}/categories/{categoryId}/stages
     */
    stageList: (
      programmingLanguageId: number,
      categoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<StageResponse[], any>({
        path: `/programmingLanguage/${programmingLanguageId}/categories/${categoryId}/stages`,
        method: 'GET',
        ...params,
      }),
  };
}
