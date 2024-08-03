.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 133 
		addi    x5 , x0 , 12 
		addi    x26 , x0 , 88 
		bltu    x22 , x5 , Less_i 
		bgeu    x22 , x5 , Bigger_i 
Less_i:
		addi    x10 , x26 , 199 
		andi    x28 , x26 , 137 
		add     x28 , x28 , x10 
		srli    x28 , x28 , 1 
		addi    x11 , x0 , 147 
		bne     x28 , x11 , Fail 
Bigger_i:
		ori     x10 , x26 , 101 
		xori    x28 , x26 , 3 
		add     x28 , x28 , x10 
		srai    x28 , x28 , 4 
		addi    x11 , x0 , 13 
		bne     x28 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
