.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x31 , 8 
		lui     x26 , 5 
		lui     x7 , 8 
		lui     x13 , 2 
		sb      x24 , 24 (x31) 
		sb      x5 , 24 (x26) 
		sb      x8 , 24 (x7) 
		sb      x3 , 24 (x13) 
		lb      x12 , 24 (x13) 
		lb      x29 , 24 (x7) 
		lb      x19 , 24 (x26) 
		lb      x20 , 24 (x31) 
		bne     x20 , x24 , Fail
		bne     x19 , x5 , Fail
		bne     x29 , x8 , Fail
		bne     x12 , x3 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
