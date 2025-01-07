.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , 84 
		addi    x8 , x0 , 83 
		sltu    x26 , x18 , x8 
		bltu    x18 , x8 , Less_i 
		bgeu    x18 , x8 , Bigger_i 
Less_i:
		ori     x7 , x18 , 73 
		sub     x24 , x8 , x18 
		srai    x24 , x24 , 0 
		and     x24 , x24 , x0 
		addi    x19 , x0 , 0 
		beq     x24 , x19 , Pass 
Bigger_i:
		ori     x7 , x18 , 133 
		sub     x24 , x8 , x18 
		srai    x24 , x24 , 2 
		and     x24 , x24 , x0 
		addi    x19 , x0 , 0 
		beq     x24 , x19 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
