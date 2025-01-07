.text

#The program checks the ALU instruction in I_type

Main:
		addi    x31 , x0 , 133 
		addi    x18 , x0 , 189 
		sltiu   x20 , x31 , 189 
		bltu    x31 , x18 , Less_i 
		bgeu    x31 , x18 , Bigger_i 
Less_i:
		ori     x26 , x31 , 170 
		sub     x4 , x18 , x31 
		srai    x4 , x4 , 4 
		and     x4 , x4 , x0 
		addi    x19 , x0 , 0 
		beq     x4 , x19 , Pass 
Bigger_i:
		ori     x26 , x31 , 76 
		sub     x4 , x18 , x31 
		srai    x4 , x4 , 0 
		and     x4 , x4 , x0 
		addi    x19 , x0 , 0 
		beq     x4 , x19 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
