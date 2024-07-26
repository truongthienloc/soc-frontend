.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x30 , 6
		auipc    x5 , 1
		auipc    x26 , 6
		auipc    x6 , 5
		lui      x27 , 7
		lui      x24 , 3
		lui      x1 , 7
		lui      x8 , 6
		sw       x31 , 116 (x30) 
		sw       x18 , 120 (x5) 
		sw       x13 , 124 (x26) 
		sw       x10 , 128 (x6) 
		sw       x22 , 132 (x27) 
		sw       x3 , 136 (x24) 
		sw       x7 , 140 (x1) 
		sw       x16 , 144 (x8) 
		lw       x19 , 144 (x8) 
		lw       x25 , 140 (x1) 
		lw       x29 , 136 (x24) 
		lw       x28 , 132 (x27) 
		lw       x20 , 128 (x6) 
		lw       x4 , 124 (x26) 
		lw       x17 , 120 (x5) 
		lw       x23 , 116 (x30) 
		bne      x23 , x31 , Fail
		bne      x17 , x18 , Fail
		bne      x4 , x13 , Fail
		bne      x20 , x10 , Fail
		bne      x28 , x22 , Fail
		bne      x29 , x3 , Fail
		bne      x25 , x7 , Fail
		bne      x19 , x16 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
