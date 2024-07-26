.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 162 
		addi    x4 , x0 , 139 
		addi    x28 , x0 , 182 
		bltu    x22 , x4 , Less_i 
		bgeu    x22 , x4 , Bigger_i 
Less_i:
		addi    x18 , x28 , 93 
		andi    x8 , x28 , 29 
		add     x8 , x8 , x18 
		srli    x8 , x8 , 1 
		addi    x29 , x0 , 147 
		bne     x8 , x29 , Fail 
Bigger_i:
		ori     x18 , x28 , 4 
		xori    x8 , x28 , 130 
		add     x8 , x8 , x18 
		srai    x8 , x8 , 3 
		addi    x29 , x0 , 29 
		bne     x8 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
