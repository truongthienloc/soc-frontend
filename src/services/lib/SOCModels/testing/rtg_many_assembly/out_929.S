.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x23 , x0 , 4 
		add     x22 , x0 , x0 
		add     x2 , x0 , x0 
		addi    x14 , x0 , 20 
		addi    x20 , x0 , 2 
InArr:
		addi    x7 , x0 , 52 
		addi    x4 , x0 , 28 
		addi    x18 , x0 , 60 
		addi    x8 , x0 , 12 
		sh      x7 , 0 (x14) 
		sh      x4 , 4 (x14) 
		sh      x18 , 8 (x14) 
		sh      x8 , 12 (x14) 
Loop:
		sll     x1 , x2 , x20 
		add     x19 , x1 , x14 
		lhu     x10 , 0 (x19) 
		add     x22 , x22 , x10 
		addi    x2 , x2 , 1 
		beq     x2 , x23 , Result 
		jal     x0 , Loop 
Result:
		addi    x28 , x0 , 152 
		bne     x28 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
