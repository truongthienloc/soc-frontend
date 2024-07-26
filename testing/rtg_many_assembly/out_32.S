.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , 114 
		addi    x5 , x0 , 81 
		addi    x29 , x0 , 78 
		bltu    x18 , x5 , Less_i 
		bgeu    x18 , x5 , Bigger_i 
Less_i:
		addi    x8 , x29 , 149 
		andi    x13 , x29 , 22 
		add     x13 , x13 , x8 
		srli    x13 , x13 , 2 
		addi    x17 , x0 , 58 
		bne     x13 , x17 , Fail 
Bigger_i:
		ori     x8 , x29 , 192 
		xori    x13 , x29 , 114 
		add     x13 , x13 , x8 
		srai    x13 , x13 , 2 
		addi    x17 , x0 , 66 
		bne     x13 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
