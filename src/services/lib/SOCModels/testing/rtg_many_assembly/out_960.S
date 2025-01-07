.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 110 
		addi    x20 , x0 , 146 
		addi    x1 , x0 , 151 
		bltu    x19 , x20 , Less_i 
		bgeu    x19 , x20 , Bigger_i 
Less_i:
		addi    x24 , x1 , 120 
		andi    x18 , x1 , 28 
		add     x18 , x18 , x24 
		srli    x18 , x18 , 3 
		addi    x9 , x0 , 36 
		bne     x18 , x9 , Fail 
Bigger_i:
		ori     x24 , x1 , 90 
		xori    x18 , x1 , 86 
		add     x18 , x18 , x24 
		srai    x18 , x18 , 3 
		addi    x9 , x0 , 52 
		bne     x18 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
