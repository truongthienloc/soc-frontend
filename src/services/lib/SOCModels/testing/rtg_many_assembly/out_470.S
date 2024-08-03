.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x20 , x0 , 4 
		addi    x4 , x0 , 0 
		addi    x22 , x0 , 0 
		addi    x28 , x0 , 8 
InArr:
		addi    x31 , x0 , 16 
		addi    x26 , x0 , 16 
		addi    x12 , x0 , 56 
		addi    x30 , x0 , 12 
		sh      x31 , 0 (x28) 
		sh      x26 , 4 (x28) 
		sh      x12 , 8 (x28) 
		sh      x30 , 12 (x28) 
Loop:
		slli    x11 , x22 , 2 
		add     x18 , x11 , x28 
		lh      x16 , 0 (x18) 
		add     x4 , x4 , x16 
		addi    x22 , x22 , 1 
		beq     x22 , x20 , Result 
		jal     x0 , Loop 
Result:
		addi    x7 , x0 , 100 
		bne     x7 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
