.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x31 , 4 
		lui     x25 , 4 
		lui     x21 , 8 
		lui     x9 , 5 
		sb      x16 , 16 (x31) 
		sb      x14 , 16 (x25) 
		sb      x4 , 16 (x21) 
		sb      x20 , 16 (x9) 
		lb      x17 , 16 (x9) 
		lb      x5 , 16 (x21) 
		lb      x2 , 16 (x25) 
		lb      x26 , 16 (x31) 
		bne     x26 , x16 , Fail
		bne     x2 , x14 , Fail
		bne     x5 , x4 , Fail
		bne     x17 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
