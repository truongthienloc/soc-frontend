.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x29 , x0 , 4 
		add     x18 , x0 , x0 
		add     x2 , x0 , x0 
		addi    x14 , x0 , 4 
InArr:
		addi    x5 , x0 , 4 
		addi    x17 , x0 , 12 
		addi    x27 , x0 , 36 
		addi    x10 , x0 , 32 
		sb      x5 , 4 (x14) 
		sb      x17 , 8 (x14) 
		sb      x27 , 12 (x14) 
		sb      x10 , 16 (x14) 
Loop:
		slli    x23 , x2 , 2 
		add     x24 , x23 , x14 
		lb      x28 , 4 (x24) 
		add     x18 , x18 , x28 
		addi    x2 , x2 , 1 
		beq     x2 , x29 , Result 
		jal     x0 , Loop 
Result:
		addi    x1 , x0 , 84 
		bne     x1 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
