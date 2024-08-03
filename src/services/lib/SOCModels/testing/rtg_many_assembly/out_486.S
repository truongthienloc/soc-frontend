.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x27 , x0 , 4 
		add     x29 , x0 , x0 
		add     x8 , x0 , x0 
		addi    x4 , x0 , 56 
InArr:
		addi    x7 , x0 , 24 
		addi    x13 , x0 , 48 
		addi    x12 , x0 , 60 
		addi    x3 , x0 , 52 
		sb      x7 , 12 (x4) 
		sb      x13 , 16 (x4) 
		sb      x12 , 20 (x4) 
		sb      x3 , 24 (x4) 
Loop:
		slli    x18 , x8 , 2 
		add     x25 , x18 , x4 
		lb      x1 , 12 (x25) 
		add     x29 , x29 , x1 
		addi    x8 , x8 , 1 
		beq     x8 , x27 , Result 
		jal     x0 , Loop 
Result:
		addi    x22 , x0 , 184 
		bne     x22 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
