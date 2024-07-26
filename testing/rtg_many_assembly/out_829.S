.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x30 , 1
		auipc    x8 , 4
		auipc    x12 , 2
		auipc    x27 , 8
		lui      x23 , 5
		lui      x21 , 0
		lui      x25 , 6
		lui      x17 , 1
		sw       x1 , 40 (x30) 
		sw       x5 , 44 (x8) 
		sw       x18 , 48 (x12) 
		sw       x22 , 52 (x27) 
		sw       x31 , 56 (x23) 
		sw       x9 , 60 (x21) 
		sw       x24 , 64 (x25) 
		sw       x26 , 68 (x17) 
		lw       x20 , 68 (x17) 
		lw       x2 , 64 (x25) 
		lw       x16 , 60 (x21) 
		lw       x7 , 56 (x23) 
		lw       x3 , 52 (x27) 
		lw       x10 , 48 (x12) 
		lw       x6 , 44 (x8) 
		lw       x29 , 40 (x30) 
		bne      x29 , x1 , Fail
		bne      x6 , x5 , Fail
		bne      x10 , x18 , Fail
		bne      x3 , x22 , Fail
		bne      x7 , x31 , Fail
		bne      x16 , x9 , Fail
		bne      x2 , x24 , Fail
		bne      x20 , x26 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
