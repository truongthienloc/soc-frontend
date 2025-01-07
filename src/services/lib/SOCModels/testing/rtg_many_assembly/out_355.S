.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 39 
		addi    x18 , x0 , 99 
		addi    x11 , x0 , 129 
		bltu    x12 , x18 , Less_i 
		bgeu    x12 , x18 , Bigger_i 
Less_i:
		addi    x31 , x11 , 64 
		andi    x2 , x11 , 81 
		add     x2 , x2 , x31 
		srli    x2 , x2 , 0 
		addi    x15 , x0 , 194 
		bne     x2 , x15 , Fail 
Bigger_i:
		ori     x31 , x11 , 11 
		xori    x2 , x11 , 174 
		add     x2 , x2 , x31 
		srai    x2 , x2 , 0 
		addi    x15 , x0 , 186 
		bne     x2 , x15 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
