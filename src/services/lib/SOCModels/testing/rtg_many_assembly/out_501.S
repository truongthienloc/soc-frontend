.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x23 , x0 , 4 
		add     x26 , x0 , x0 
		add     x28 , x0 , x0 
		addi    x6 , x0 , 16 
InArr:
		addi    x10 , x0 , 76 
		addi    x15 , x0 , 20 
		addi    x18 , x0 , 32 
		addi    x5 , x0 , 32 
		sb      x10 , 40 (x6) 
		sb      x15 , 44 (x6) 
		sb      x18 , 48 (x6) 
		sb      x5 , 52 (x6) 
Loop:
		slli    x14 , x28 , 2 
		add     x12 , x14 , x6 
		lb      x22 , 40 (x12) 
		add     x26 , x26 , x22 
		addi    x28 , x28 , 1 
		beq     x28 , x23 , Result 
		jal     x0 , Loop 
Result:
		addi    x21 , x0 , 160 
		bne     x21 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
