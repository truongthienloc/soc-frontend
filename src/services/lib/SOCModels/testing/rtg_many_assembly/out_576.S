.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x5 , 1 
		lui     x14 , 9 
		lui     x25 , 1 
		lui     x2 , 9 
		sb      x19 , 72 (x5) 
		sb      x15 , 72 (x14) 
		sb      x24 , 72 (x25) 
		sb      x22 , 72 (x2) 
		lb      x27 , 72 (x2) 
		lb      x10 , 72 (x25) 
		lb      x29 , 72 (x14) 
		lb      x16 , 72 (x5) 
		bne     x16 , x19 , Fail
		bne     x29 , x15 , Fail
		bne     x10 , x24 , Fail
		bne     x27 , x22 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
