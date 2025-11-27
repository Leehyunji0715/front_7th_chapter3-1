import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { NativeSelect, NativeSelectOption } from '../ui/native-select';

const formSchema = z.object({
  username: z.string().min(1, '사용자명은 필수입니다'),
  email: z
    .string()
    .min(1, '이메일은 필수입니다')
    .email({ message: '올바르지 않은 이메일 주소입니다' }),
  role: z.enum(['admin', 'user', 'moderator']),
  status: z.enum(['active', 'inactive', 'suspended']),
});

type Props = {
  data?: z.infer<typeof formSchema>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
};

export const UserForm = ({ data, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: data?.username || '',
      email: data?.email || '',
      role: data?.role || 'user',
      status: data?.status || 'active',
    },
  });

  function _onSubmit(value: z.infer<typeof formSchema>) {
    onSubmit(value);
    console.log(value);
  }

  return (
    <Form {...form}>
      <form
        id='user-form'
        onSubmit={form.handleSubmit(_onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className='relative after:absolute after:top-[-3px] after:text-red-500 after:content-["*"]'>
                  사용자명
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder='사용자명을 입력하세요' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className='relative after:absolute after:top-[-3px] after:text-red-500 after:content-["*"]'>
                  이메일
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder='이메일을 입력하세요' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full gap-2'>
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>역할</FormLabel>
                <FormControl>
                  <NativeSelect {...field}>
                    <NativeSelectOption value='user'>사용자</NativeSelectOption>
                    <NativeSelectOption value='admin'>
                      관리자
                    </NativeSelectOption>
                    <NativeSelectOption value='moderator'>
                      운영자
                    </NativeSelectOption>
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>상태</FormLabel>
                <FormControl>
                  <NativeSelect {...field}>
                    <NativeSelectOption value='active'>활성</NativeSelectOption>
                    <NativeSelectOption value='inactive'>
                      비활성
                    </NativeSelectOption>
                    <NativeSelectOption value='suspended'>
                      정지
                    </NativeSelectOption>
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <div className='flex justify-end gap-2'>
          <Button variant='secondary' onClick={onClose}>
            취소
          </Button>
          <Button type='submit'>생성</Button>
        </div> */}
      </form>
    </Form>
  );
};
