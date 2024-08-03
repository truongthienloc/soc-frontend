.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x19 , 6 
		lui     x22 , 5 
		lui     x9 , 2 
		lui     x10 , 6 
		sb      x5 , 28 (x19) 
		sb      x12 , 28 (x22) 
		sb      x26 , 28 (x9) 
		sb      x17 , 28 (x10) 
		lb      x16 , 28 (x10) 
		lb      x8 , 28 (x9) 
		lb      x15 , 28 (x22) 
		lb      x4 , 28 (x19) 
		bne     x4 , x5 , Fail
		bne     x15 , x12 , Fail
		bne     x8 , x26 , Fail
		bne     x16 , x17 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
