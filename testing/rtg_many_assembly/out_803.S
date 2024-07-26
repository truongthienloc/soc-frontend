.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x13 , x0 , 4 
		add     x12 , x0 , x0 
		add     x20 , x0 , x0 
		addi    x18 , x0 , 56 
InArr:
		addi    x1 , x0 , 76 
		addi    x28 , x0 , 28 
		addi    x14 , x0 , 48 
		addi    x5 , x0 , 0 
		sw      x1 , 60 (x18) 
		sw      x28 , 64 (x18) 
		sw      x14 , 68 (x18) 
		sw      x5 , 72 (x18) 
Loop:
		slli    x7 , x20 , 2 
		add     x9 , x7 , x18 
		lw      x23 , 60 (x9) 
		add     x12 , x12 , x23 
		addi    x20 , x20 , 1 
		beq     x20 , x13 , Result 
		jal     x0 , Loop
Result:
		addi    x25 , x0 , 152 
		bne     x25 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
