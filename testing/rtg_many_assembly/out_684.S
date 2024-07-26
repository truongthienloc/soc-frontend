.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x25 , 7 
		lui     x24 , 3 
		lui     x8 , 3 
		lui     x18 , 3 
		sb      x14 , 100 (x25) 
		sb      x2 , 100 (x24) 
		sb      x3 , 100 (x8) 
		sb      x21 , 100 (x18) 
		lb      x16 , 100 (x18) 
		lb      x17 , 100 (x8) 
		lb      x4 , 100 (x24) 
		lb      x29 , 100 (x25) 
		bne     x29 , x14 , Fail
		bne     x4 , x2 , Fail
		bne     x17 , x3 , Fail
		bne     x16 , x21 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
