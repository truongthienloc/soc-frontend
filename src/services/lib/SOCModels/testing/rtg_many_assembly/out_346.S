.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x31 , x0 , 4 
		add     x10 , x0 , x0 
		add     x5 , x0 , x0 
		addi    x26 , x0 , 68 
InArr:
		addi    x12 , x0 , 8 
		addi    x14 , x0 , 52 
		addi    x16 , x0 , 36 
		addi    x24 , x0 , 72 
		sb      x12 , 56 (x26) 
		sb      x14 , 60 (x26) 
		sb      x16 , 64 (x26) 
		sb      x24 , 68 (x26) 
Loop:
		slli    x17 , x5 , 2 
		add     x6 , x17 , x26 
		lb      x13 , 56 (x6) 
		add     x10 , x10 , x13 
		addi    x5 , x5 , 1 
		beq     x5 , x31 , Result 
		jal     x0 , Loop 
Result:
		addi    x25 , x0 , 168 
		bne     x25 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
