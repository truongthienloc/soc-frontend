.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x16 , 0 
		lui     x6 , 4 
		lui     x10 , 9 
		lui     x7 , 3 
		sb      x22 , 68 (x16) 
		sb      x3 , 68 (x6) 
		sb      x4 , 68 (x10) 
		sb      x15 , 68 (x7) 
		lb      x20 , 68 (x7) 
		lb      x23 , 68 (x10) 
		lb      x19 , 68 (x6) 
		lb      x9 , 68 (x16) 
		bne     x9 , x22 , Fail
		bne     x19 , x3 , Fail
		bne     x23 , x4 , Fail
		bne     x20 , x15 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
